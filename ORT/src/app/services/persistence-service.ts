import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb-core';
import PouchDBAdapterIdb from 'pouchdb-adapter-idb';
import PouchDBFind from 'pouchdb-find';
import { Route } from '../models/tracking.interfaces';
import { v4 as uuidv4 } from 'uuid';

PouchDB.plugin(PouchDBAdapterIdb);
PouchDB.plugin(PouchDBFind);

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  private db: PouchDB.Database;

  constructor() {
    this.db = new PouchDB('routes-db');
    this.init();
  }

  private async init() {
    await this.db.createIndex({
      index: { fields: ['_id','type'] }
    });
  }

  async saveRoute(route: Route): Promise<Route> {
    const doc: Route = {
      ...route,
      _id: `route:${uuidv4()}`
    };

    const response = await this.db.put(doc)
    doc._rev = response.rev

    return doc;
  }

  async getAllRoutes(): Promise<Route[]> {
    const result = await this.db.find({
      selector: { type: 'route' }
    });

    // tool for cleansing routes
    // for (let doc of (result.docs as Route[])) {
    //   console.log(doc.routePoints.length);
      
    //   if(doc.routePoints.length <=2){
    //     this.deleteRoute(doc);
    //   }
    // }
    
    return result.docs as Route[];
  }

  async deleteRoute(route: Route): Promise<void> {
    if (!route._id || !route._rev) {
      return; // route does not exist
    }
    this.db.remove(route as Required<Route>);
  }
}
