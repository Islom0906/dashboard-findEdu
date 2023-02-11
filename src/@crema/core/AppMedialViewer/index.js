import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.style.less';
import PropTypes from 'prop-types';

const settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const renderItem = (data, index) => {
  if (data.mime_type.startsWith('image')) {
    return (
      <img
        key={index}
        src={data.url}
        alt={data.name ? data.name : 'detail view'}
      />
    );
  } else if (data.mime_type.startsWith('docs')) {
    return (
      <div className='embed-responsive'>
        <iframe
          key={index}
          src={data.url}
          title={data.name ? data.name : 'detail view'}
        />
      </div>
    );
  } else {
    return (
      <div className='embed-responsive'>
        <iframe
          key={index}
          src={data.url}
          title={data.name ? data.name : 'detail view'}
        />
      </div>
    );
  }
};

const AppMediaViewer = ({index, modalTitle, medias, onClose}) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (index > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [index]);

  return (
    <Modal
      title={modalTitle}
      visible={isOpen}
      footer={null}
      onCancel={onClose}
      className='app-media-modal'>
      <div className='media-viewer'>
        {index >= 0 ? (
          <div className='medial-carousel'>
            <Slider
              settings={{...settings, initialSlide: index}}
              slickGoTo={index}>
              {medias.map((data, index) => renderItem(data, index))}
            </Slider>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default AppMediaViewer;

AppMediaViewer.propTypes = {
  index: PropTypes.number,
  modalTitle: PropTypes.string,
  medias: PropTypes.array,
  onClose: PropTypes.func,
};
