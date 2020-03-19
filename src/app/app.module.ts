import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [AppComponent, MessagesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAsqjbliXzg8hPUFKRdzq4p5gLy5h5auFI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
