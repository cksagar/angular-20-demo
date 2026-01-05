import { Component, OnDestroy } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { Product } from './product.model';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnDestroy {
  searchControl = new FormControl();

  productsData: Product | null = null;
  private destroy$ = new Subject<void>();

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private masterService: MasterService) {
    //switchMap
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        switchMap((query) => {
          return this.masterService.searchProducts(query);
        }),
      )
      .subscribe((data) => {
        this.productsData = data;
        console.log('product data', data);
      });

    // // mergeMap
    //  this.searchControl.valueChanges.pipe(
    //   takeUntil(this.destroy$),
    // debounceTime(500),
    //   mergeMap((query)=>{
    //     return this.masterService.searchProducts(query);
    //   })
    // ).subscribe((data) => {
    //   this.productsData = data;
    //   console.log('product data', data);
    // });

    // //concatMap
    // this.searchControl.valueChanges.pipe(
    //   takeUntil(this.destroy$),
    // debounceTime(500),
    //   concatMap((query)=>{
    //     return this.masterService.searchProducts(query);
    //   })
    // ).subscribe((data) => {
    //   this.productsData = data;
    //   console.log('product data', data);
    // });
  }

  // getProduct(query: string) {
  //   this.masterService.searchProducts(query).subscribe((data) => {
  //     console.log('product data', data);
  //   });
  // }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
