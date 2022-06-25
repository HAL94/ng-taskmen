import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, Firestore, getDoc, orderBy, query, runTransaction, updateDoc, where, writeBatch } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
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
    const boardRef = collection(this.fs, 'boards');
    const { uid } = this.auth.user;

    const boardDocRef = await addDoc(boardRef, {
      ...data,
      tasks: [],
      uid
    });

    await updateDoc(boardDocRef, {
      id: boardDocRef.id
    });
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
   async sortBoards(boards: Board[]) {
    const batch = writeBatch(this.fs);
    const refs = boards.map(b => doc(this.fs, `boards/${b.id}`));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    await batch.commit();
    // const db = firebase.firestore();
    // const batch = db.batch();
    // const refs = boards.map(b => db.collection('boards').doc(b.id));
    // refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    // batch.commit();
  }

  /**
   * Delete board
   */
   async deleteBoard(boardId: string) {
    const boardRef = doc(this.fs, `boards/${boardId}`);
    await deleteDoc(boardRef);
  }

  /**
   * Updates the tasks on board, includes editing and deleting
   */
   async updateTasks(boardId: string, tasks: Task[]) {
    console.log('updating');
    const boardRef = doc(this.fs, `boards/${boardId}`);
    await updateDoc(boardRef, { tasks });
  }

}
