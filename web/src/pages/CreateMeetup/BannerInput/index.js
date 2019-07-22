import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { MdAddAPhoto } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
  const { registerField, error } = useField('banner_id');

  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('upload/banner', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        <img src={preview} alt="" />

        <div className="overlay">
          <MdAddAPhoto size={48} color="rgba(0, 0, 0, .1)" />
        </div>

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>

      {error && <span>{error}</span>}
    </Container>
  );
}
