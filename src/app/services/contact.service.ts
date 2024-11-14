import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://localhost:7092/api/contacts'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Fetch contacts with pagination
  getContacts(page: number, pageSize: number): Observable<{ contacts: Contact[], totalPages: number }> {
    const params = { page: page.toString(), pageSize: pageSize.toString() };
    return this.http.get<{ contacts: Contact[], totalPages: number }>(this.apiUrl, { params });
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
