import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-payme',
  templateUrl: './payme.component.html',
  styleUrls: ['./payme.component.css']
})
export class PaymeComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @Input() price: string;
  @Output() payResponse = new EventEmitter<any>();


  paidFor = false;


  ngOnInit() {
   console.log(paypal);
   paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                  amount: {
                  currency_code: 'USD',
                  value: this.price
                }
              }
            ]
          });
        },

        onApprove: async (data, actions) => {

          const order = await actions.order.capture();
          this.paidFor = true;

          console.log(order);
          this.payResponse.emit(order);


        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
