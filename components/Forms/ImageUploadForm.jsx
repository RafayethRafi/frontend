'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UploadCloud } from "lucide-react";

const ImageUploadForm = ({ endpoint, token }) => {
  const [altText, setAltText] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('altText', altText);
    formData.append('image', image);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      setMessage('Image uploaded successfully!');
      setAltText('');
      setImage(null);
    } catch (error) {
      setMessage('Error uploading image. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="altText" className="block text-sm font-medium mb-1">
          Alt Text:
        </label>
        <Input
          type="text"
          id="altText"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="w-full"
          required
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Image:
        </label>
        <Input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <UploadCloud className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Image
          </span>
        )}
      </Button>
      {message && (
        <Alert variant={message.includes('successfully') ? 'default' : 'destructive'}>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </form>
  );
};

export default ImageUploadForm;