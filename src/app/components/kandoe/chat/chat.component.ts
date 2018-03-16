import {Component, OnInit, Input} from '@angular/core';
import * as $ from 'jquery';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {UseridStorage} from '../../../sessionStorage/userid-storage';
import {Message} from '../../../model/message';
import {MessageService} from '../../../services/message.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [UseridStorage, MessageService]
})
export class ChatComponent implements OnInit {
  private serverUrl = 'https://kandoe-backend.herokuapp.com/socket';
  @Input() sessionId;
  private stompClient;
  public username;
  public messages = [new Message('')];
  page_title = '';
  error_message = '';

  constructor(private userIdStorage: UseridStorage, private messageService: MessageService, private translate: TranslateService) {
    this.username = userIdStorage.getUsername();
  }

  ngOnInit() {
    this.translate.get('Kandoe.Chat.page_title', {value: 'world'}).subscribe(e => {
      this.page_title = e;
    });
    window.document.title = this.page_title;

    this.initializeWebSocketConnection();
    this.messageService.getMessages(this.sessionId, this.userIdStorage.getUserId()).subscribe(data => { // sessionId ipv 2
        this.messages = data;
      },
      error => {
        this.translate.get('Kandoe.Chat.error_chat', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat/' + this.sessionId, (message) => { // ipv 2 -> sessionId
        if (message.body) {
          $('.chat-body').append(
            '<div class=\'message\'>' +
              '<div class="header">' +
                '<strong class="primary-font">' + 'Nick'  + '</strong>'  +
              '</div>'
            +
            '<p>' +
              message.body
               +
            '</p>'
            +
            '</div>'
          );
          console.log(message.body);
        }
      });
    });
  }
  sendMessage(message) {
    const usernameMessage = this.userIdStorage.getUsername() + ': ' +  message ;
    const dbMessage = new Message( usernameMessage);
    this.messageService.sendMessage(dbMessage, this.sessionId, this.userIdStorage.getUserId()).subscribe(data => { // ipv 2 naar sessionId
        console.log('message successfully send to database');
      },
      error => {
        this.translate.get('Kandoe.Chat.error_chat', {value: 'world'}).subscribe(e => {
          this.error_message = e;
        });
        console.error(this.error_message);
        console.log(error);
        alert(this.error_message);
      });
    this.stompClient.send('/app/send/message/' + this.sessionId , {}, usernameMessage); // ipv 2 -> sessionId
    $('#input').val('');
  }

}
