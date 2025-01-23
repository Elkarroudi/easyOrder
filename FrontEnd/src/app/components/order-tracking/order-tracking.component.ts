import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-5xl font-bold text-[#B91C1C] mb-12">Your Order</h1>
        
        <div class="bg-white rounded-[32px] p-14 shadow-lg">
          <div class="relative">
            <!-- Ligne verticale centrale -->
            <div class="absolute left-4 top-4 w-[2px] h-[calc(100%-32px)] bg-[#D1D5DB]"></div>

            <!-- Preparing -->
            <div class="relative flex mb-20">
              <div class="absolute left-0 -translate-x-[2px]">
                <div class="w-9 h-9 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div class="ml-16">
                <h3 class="text-2xl font-medium text-[#1F2937]">Preparing</h3>
                <p class="mt-2 text-base text-[#4B5563]">Your order will be out the kitchen soon</p>
              </div>
            </div>

            <!-- On Delivery -->
            <div class="relative flex mb-20">
              <div class="absolute left-0 -translate-x-[2px]">
                <div class="w-9 h-9 rounded-full bg-[#D1D5DB] flex items-center justify-center">
                  <div class="w-3 h-3 rounded-full bg-[#6B7280]"></div>
                </div>
              </div>
              <div class="ml-16">
                <h3 class="text-2xl font-medium text-[#1F2937]">On Delivery</h3>
                <p class="mt-2 text-base text-[#4B5563]">Your order is on it's way</p>
              </div>
            </div>

            <!-- Served -->
            <div class="relative flex">
              <div class="absolute left-0 -translate-x-[2px]">
                <div class="w-9 h-9 rounded-full bg-[#D1D5DB] flex items-center justify-center">
                  <div class="w-3 h-3 rounded-full bg-[#6B7280]"></div>
                </div>
              </div>
              <div class="ml-16">
                <h3 class="text-2xl font-medium text-[#1F2937]">Served</h3>
                <p class="mt-2 text-base text-[#4B5563]">Enjoy your meal while hot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class OrderTrackingComponent {}
