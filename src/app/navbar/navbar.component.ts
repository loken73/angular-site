import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../shared/appointment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenExists: boolean;
  constructor(private router: Router,
              private apptService: AppointmentService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.findToken();

    this.apptService.getAppts().subscribe(res => console.log(res));
    this.apptService.getAllAppts().subscribe(res => console.log(res));
  }

  findToken() {
    this.tokenExists = localStorage.getItem('User_Token') !== null;

    return this.tokenExists;

  }

  LogOut() {
    localStorage.removeItem('User_Token');
    this.toastr.success('User logged out successfully.');
    this.router.navigate(['/login-register']);
  }


}
