import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
  TransactionSummaryModel,
  SmartContractModel
} from '@blockexplorer/shared/models';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Log } from '@blockexplorer/shared/utils';
import { TokensFacade } from 'libs/state/tokens-state/src';
import { TokenTransactionResponse } from 'libs/state/tokens-state/src/lib/services/token-transaction-response';

@Component({
  selector: 'blockexplorer-token-summary-page',
  templateUrl: './token-summary-page.component.html',
  styleUrls: ['./token-summary-page.component.css']
})
export class TokenSummaryPageComponent implements OnInit, OnDestroy {
  transactionsLoaded$: Observable<boolean>;
  transactions: TokenTransactionResponse[] = [];
  destroyed$ = new ReplaySubject<any>();
  hash = '';
  transactions$: Observable<TokenTransactionResponse[]>;

  constructor(
    private route: ActivatedRoute,
    private tokensFacade: TokensFacade,
    private log: Log
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap: any) => {
        if (!!paramMap.params.address) {
          this.hash = paramMap.params.address;
          console.log(this.hash);
          this.tokensFacade.loadRecent(this.hash);
        }
      });
    this.loadTokenDetails();
  }

  private loadTokenDetails() {
    this.transactionsLoaded$ = this.tokensFacade.loaded$;
    this.transactions$ = this.tokensFacade.allTokens$;
    this.transactions$.pipe(takeUntil(this.destroyed$))
        .subscribe(tokens => {
          this.transactions = tokens;
        });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
