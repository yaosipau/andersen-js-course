/* eslint-disable no-return-await */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export class Musician {
  constructor(albumsUrl) {
    this.albumsUrl = albumsUrl;
  }

  async getAlbums() {
    const response = await fetch(this.albumsUrl);
    return await response.json();
  }
}
