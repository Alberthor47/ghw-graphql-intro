import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';

const QUERY_GET_ALL_TASKS = gql`
  {
    tasks {
      id
      title
      description
      completed
      createdAt
      updatedAt
    } 
  }
`;

const MUTATION_CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      id
      createdAt
      updatedAt
    }
  }
`;

const MUTATION_UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $completed: Boolean) {
    updateTask(id: $id, completed: $completed) {
      id
      createdAt
      updatedAt
    }
  }
`;

const MUTATION_DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private apollo: Apollo) {}

  getTasks(): Observable<any[]> {
    return this.apollo
      .watchQuery<any>({
        query: QUERY_GET_ALL_TASKS,
      })
      .valueChanges.pipe(map((result) => result.data.tasks));
  }

  createTask(title: string, description: string): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_CREATE_TASK,
      variables: { title, description },
    });
  }

  updateTask(id: string, completed: boolean): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_UPDATE_TASK,
      variables: { id, completed },
    });
  }

  deleteTask(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_DELETE_TASK,
      variables: { id },
    });
  }
}
