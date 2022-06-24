import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { collectionData, doc, Firestore, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/data-access/auth.service';
import { Board, Task } from '../utils/board.model';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  constructor(private auth: AuthService, private fs: Firestore) {}
  /**
   * Creates a new board for the current user
   */
  async createBoard(data: Board) {
    // const user = await this.afAuth.currentUser;
    // return this.db.collection('boards').add({
    //   ...data,
    //   uid: user.uid,
    //   tasks: [{ description: 'Hello!', label: 'yellow' }]
    // });
  }

  /**
   * Get all boards owned by current user
   */
   getUserBoards(): Observable<Board[]> {
    const { uid } = this.auth.user;
    const boardsRef = collection(this.fs, 'boards');
    const userBoardsQuery = query(boardsRef, where('uid', '==', uid), orderBy('priority'));
    return collectionData(userBoardsQuery).pipe(        
        // tap((result) => console.log('got board result', result)),
        map((result) => result as Board[])
    );    
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
   sortBoards(boards: Board[]) {
    // const db = firebase.firestore();
    // const batch = db.batch();
    // const refs = boards.map(b => db.collection('boards').doc(b.id));
    // refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    // batch.commit();
  }

  /**
   * Delete board
   */
   deleteBoard(boardId: string) {
    // return this.db
    //   .collection('boards')
    //   .doc(boardId)
    //   .delete();
  }

  /**
   * Updates the tasks on board
   */
   async updateTasks(boardId: string, tasks: Task[]) {
    console.log('updating');
    const boardRef = doc(this.fs, `boards/${boardId}`);
    await updateDoc(boardRef, { tasks });
    // return this.db
    //   .collection('boards')
    //   .doc(boardId)
    //   .update({ tasks });
  }

  /**
   * Remove a specifc task from the board
   */
   removeTask(boardId: string, task: Task) {
    // return this.db
    //   .collection('boards')
    //   .doc(boardId)
    //   .update({
    //     tasks: firebase.firestore.FieldValue.arrayRemove(task)
    //   });
  }
}
