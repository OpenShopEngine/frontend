import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from './model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionsService {
  constructor(private http: HttpClient) {}
  get(id: number): Promise<Transaction> {
    return this.http.get(`/api/ppu/transactions/${id}`)
      .toPromise()
      .then(transaction => transaction as Transaction);
  }
}
