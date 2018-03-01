import { Injectable } from '@angular/core';
import { HttpClientProvider } from '../http-client/http-client';
import { SqlLiteProvider } from '../sql-lite/sql-lite';
import { DataSet } from '../../models/dataSet';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DataSetsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataSetsProvider {
  readonly resourceName = 'dataSets';

  constructor(
    private httpClient: HttpClientProvider,
    private sqlLite: SqlLiteProvider
  ) {}

  /**
   *
   * @param currentUser
   * @returns {Observable<any>}
   */
  downloadDataSetsFromServer(currentUser): Observable<any> {
    let url =
      '/api/dataSets.json?fields=id,name,dataSetElements[dataElement[id,categoryCombo[categoryOptionCombos[id,name]]]],dataElements[id,categoryCombo[categoryOptionCombos[id,name]]]';
    return new Observable(observer => {
      this.httpClient
        .get(url, false, currentUser, this.resourceName, 50)
        .subscribe(
          (response: any) => {
            observer.next(response[this.resourceName]);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  /**
   *
   * @param dataSets
   * @param currentUser
   * @returns {Observable<any>}
   */
  saveDataSetsFromServer(dataSets, currentUser): Observable<any> {
    return new Observable(observer => {
      this.sqlLite
        .insertBulkDataOnTable(
          this.resourceName,
          dataSets,
          currentUser.currentDatabase
        )
        .subscribe(
          () => {
            observer.next();
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }

  /**
   *
   * @param currentUser
   * @returns {Observable<any>}
   */
  getAllDataSets(currentUser): Observable<any> {
    return new Observable(observer => {
      this.sqlLite
        .getAllDataFromTable(this.resourceName, currentUser.currentDatabase)
        .subscribe(
          (dataSets: Array<DataSet>) => {
            observer.next(dataSets);
            observer.complete();
          },
          error => {
            observer.error(error);
          }
        );
    });
  }
}
