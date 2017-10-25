import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: String = 'Michi Supremo';
  a_text_botones: String[] = [];
  ROWS = 20;
  COLS = 20;
  range_ROWS: Number[] = [];
  range_COLS: Number[] = [];
  turno_index = 0;
  player = 'X';
  tags_player = ['X', 'O'];
  dir_names = 'e ne n nw w sw s se'.split(' ');
  dirs = {
    'e' : [ 1,  0],
    'ne': [ 1, -1],
    'n' : [ 0, -1],
    'nw': [-1, -1],
    'w' : [-1,  0],
    'sw': [-1,  1],
    's' : [ 0,  1],
    'se': [ 1,  1]
  };
  constructor() {
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        this.a_text_botones.push(' ');
      }
    }
    for (let i = 0; i < this.ROWS; i++) {
      this.range_ROWS.push(i);
    }
    for (let j = 0; j < this.COLS; j++) {
      this.range_COLS.push(j);
    }
  }
  onClick(i, j) {
    this.a_text_botones[ i * this.COLS + j] = this.tags_player[this.turno_index];
    this.player = this.tags_player[(this.turno_index + 1) % 2];
    this.calcularWinner(i, j);
    this.turno_index = (this.turno_index + 1) % 2;
  }
  inSide(i, j): Boolean {
    if (0 <= i && i < this.ROWS && 0 <= j && j < this.COLS) {
      return true;
    }
  }
  gotoxy(i, j): number {
    return i * this.COLS + j;
  }
  calcularWinner(i, j) {
    let txt_dir = this.dir_names.slice(0);
    const list = [];
    for ( const txt_boton of this.a_text_botones ){
      list.push(txt_boton);
    }
    const ch = this.tags_player[this.turno_index];
    let rango = 1;
    const a_sent_0 = [];
    const a_sent_45 = [];
    const a_sent_90 = [];
    const a_sent_135 = [];
    a_sent_0.push([i, j]);
    a_sent_45.push([i, j]);
    a_sent_90.push([i, j]);
    a_sent_135.push([i, j]);
    while (txt_dir.length > 0) {
      for (const index_name of txt_dir) {
        const ii = i + rango * this.dirs[ index_name ][1];
        const jj = j + rango * this.dirs[ index_name ][0];
        if ( this.inSide(ii, jj)) {
          // txt_boton ... es el caracter que vamos a ver si se parece al caracter central
          const txt_boton = this.a_text_botones[this.gotoxy(ii, jj)];
          if ( txt_boton === ch ) {
            if (index_name === 'e' || index_name === 'w') {
              a_sent_0.push([ii, jj]);
            }
            if (index_name === 'ne' || index_name === 'sw') {
              a_sent_45.push([ii, jj]);
            }
            if (index_name === 'n' || index_name === 's') {
              a_sent_90.push([ii, jj]);
            }
            if (index_name === 'nw' || index_name === 'se') {
              a_sent_135.push([ii, jj]);
            }
            const a_sent = [a_sent_0.length , a_sent_45.length , a_sent_90.length , a_sent_135.length];
            const max_sent = Math.max( ...a_sent );
            if ( max_sent === 5) {
              // Aqui se define al ganador:
              const index_max = a_sent.indexOf(max_sent);
              this.player = 'Winner ' + ch;
            }
          } else {
            // El caracter no es igual :
            txt_dir = txt_dir.filter((name) => {
              return name !== index_name;
            });
          }
        } else {
          txt_dir = txt_dir.filter((name) => {
            return name !== index_name;
          });
        }
      }// end for
      rango ++;
    }// end while
  }
}
