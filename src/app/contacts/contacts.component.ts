import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const scriptYmaps = document.createElement('script');
    scriptYmaps.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A6d821e864cbfe6205f1a7c21fc74ef89849d46aa803890e59cda1d3c4278e613&amp;width=100%25&amp;height=360&amp;lang=ru_RU&amp;scroll=true';
    scriptYmaps.async = true;
    scriptYmaps.type = 'text/javascript';
    scriptYmaps.charset = 'utf-8';
    document.getElementsByClassName('map')[0].append(scriptYmaps);
  }

}
