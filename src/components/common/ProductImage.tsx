'use client';

import React, { useState } from 'react';
import { CategoryType } from '../../types';
import { DrinkRender } from './DrinkRender';

interface ProductImageProps {
  id?: string;
  name?: string;
  src?: string;
  alt?: string;
  category: CategoryType;
  className?: string;
  imageClassName?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  id = '',
  name = '',
  src = '',
  alt = '',
  category,
  className = '',
  imageClassName = '',
}) => {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt || name}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${imageClassName}`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center p-2 ${className}`}>
      <DrinkRender id={id} name={name} category={category} className="w-full h-full max-h-48" />
    </div>
  );
};
