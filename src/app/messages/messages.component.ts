import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  // Variables
  allMsg;
  contents;
  myObj;
  Locations;
  places: any;
  previous;
  Arr = [];
  PositiveMessages = [];
  NegativeMessages = [];
  NeutralMessages = [];

  // For map
  // google maps zoom level
  zoom = 3;
  screenOptions = {
    position: 2
  };
  latitude = 20.673858;
  longitude = 20.815982;
  // latitude = 40.73061;
  // longitude = -73.935242;

  constructor(private msg: MessageService) {
    // get data  from service
    this.getData();

    // City
    this.Locations = [
      {
        title: 'Damascus',
        latitude: 33.510414,
        longitude: 36.278336
      },
      {
        title: 'Mogadishu',
        latitude: 2.046934,
        longitude: 45.318161
      },
      {
        title: 'Ibiza',
        latitude: 38.906986,
        longitude: 1.421416
      },
      {
        title: 'Cairo, Egypt',
        latitude: 30.033333,
        longitude: 31.233334
      },
      {
        title: 'Tahrir',
        latitude: 30.0444,
        longitude: 31.2357
      },
      {
        title: 'Nairobi',
        latitude: -1.286389,
        longitude: 36.817223
      },
      {
        title: 'Kathmandu',
        latitude: 27.700769,
        longitude: 85.30014
      },
      {
        title: 'Bernabau, Madrid, Spain',
        latitude: 40.416775,
        longitude: -3.70379
      },
      {
        title: 'Athens',
        latitude: 37.937225,
        longitude: 23.945238
      },
      {
        title: 'Istanbul',
        latitude: 41.015137,
        longitude: 28.97953
      }
    ];
  }

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
    // console.log(`clicked the marker`);
  }

  // Function that get data
  getData() {
    this.msg.getMessages().subscribe(data => {
      this.allMsg = data.feed.entry;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.allMsg.length; i++) {
        this.contents = this.allMsg[i].content.$t;
        this.Arr.push(this.contents);
      }
      // console.log(this.Arr);

      // Filtering sentiment from Arr
      // tslint:disable-next-line: prefer-for-of --> this comment generated from angular9 tslint
      for (let i = 0; i < this.Arr.length; i++) {
        const SentimentIndex = this.Arr[i].indexOf('sentiment:') + 11;
        const Sentiment = this.Arr[i].substring(
          SentimentIndex !== -1 ? SentimentIndex : this.Arr[i].length,
          this.Arr[i].length
        );
        // console.log(Sentiment);
        // Filtering Message from Arr
        const MessageIndex = this.Arr[i].indexOf('message:') + 9;
        const Message = this.Arr[i].substring(
          MessageIndex,
          SentimentIndex - 12
        );
        // add message and sentiment to array locations
        this.Locations[i].Message = Message;
        this.Locations[i].Sentiment = Sentiment;
      }
      console.log(this.Locations);
      const PostiveURL = './assets/images/happy.png';
      const NegativeURL = './assets/images/sad.png';
      const NeutralURL = './assets/images/neutral.png';

      // tslint:disable-next-line: prefer-for-of
      for (let j = 0; j < this.Locations.length; j++) {
        switch (this.Locations[j].Sentiment) {
          case 'Negative':
            this.Locations[j].IconUrl = NegativeURL;
            this.PositiveMessages.push(this.Locations[j]);
            break;

          case 'Positive':
            this.Locations[j].IconUrl = PostiveURL;
            this.NegativeMessages.push(this.Locations[j]);
            break;

          default:
            this.Locations[j].IconUrl = NeutralURL;
            this.NeutralMessages.push(this.Locations[j]);
            break;
        }
      }
      console.log(this.NegativeMessages);
      console.log(this.PositiveMessages);
      console.log(this.NeutralMessages);
    });
  }
  // filtering cityes
  // tslint:disable-next-line: prefer-for-of
  // for (let i = 0; i < this.Arr.length; i++) {
  //   const c = this.Arr[i].indexOf('in') + 2;
  //   const city = this.Arr[i].substring(
  //     c !== -1 ? c : this.Arr.length,
  //     ',sentiment:'
  //   );
  //   console.log(city);
  // }
  ngOnInit(): void {}
}
