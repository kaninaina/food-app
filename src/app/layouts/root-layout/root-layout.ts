import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-root-layout',
  imports: [RouterOutlet, Header],
  templateUrl: './root-layout.html',
  styleUrl: './root-layout.css',
})
export class RootLayout {}
