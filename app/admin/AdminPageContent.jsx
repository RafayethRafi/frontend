import React from 'react';
import ImageUploadForm from '@/components/Forms/ImageUploadForm';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPageContent = ({ auth }) => {
  const api = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="container mx-auto px-4 py-12 bg-background min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Update Hero Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadForm 
              endpoint="/admin/hero_image_update" 
              token={auth.token} 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Update Cricket Background</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadForm 
              endpoint="/admin/cricket_image_update" 
              token={auth.token} 
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Update Football Background</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploadForm 
              endpoint="/admin/football_image_update" 
              token={auth.token} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPageContent;