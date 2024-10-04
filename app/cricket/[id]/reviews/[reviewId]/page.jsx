'use client';

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from 'next/navigation';
import ReviewEditor from "@/components/ReviewEditor";
import useAuth from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function ReviewPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const { id, reviewId } = useParams();
  const [review, setReview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchReview = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/cricket_review/${reviewId}`);
      if (!response.ok) throw new Error('Failed to fetch review');
      const data = await response.json();
      setReview(data);
    } catch (error) {
      console.error('Error fetching review:', error);
      toast({
        title: "Error",
        description: "Failed to fetch review. Please try again.",
        variant: "destructive",
      });
    }
  }, [reviewId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const handleReviewSubmit = async (reviewData) => {
    if (!token) {
      console.log('Token not available, cannot submit review');
      return;
    }

    try {
      const response = await fetch(`${api}/admin/edit_cricket_review?review_id_to_edit=${reviewId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) throw new Error('Failed to update review');
      
      await fetchReview();
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Review updated successfully",
      });
    } catch (error) {
      console.error('Error updating review:', error);
      toast({
        title: "Error",
        description: "Failed to update review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteReview = async () => {
    if (!token) {
      console.log('Token not available, cannot delete review');
      return;
    }

    try {
      const response = await fetch(`${api}/admin/delete_cricket_review?review_id_to_delete=${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete review');
      
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      router.push(`/leagues/${id}`);
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || !review) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">{review.team1} vs {review.team2}</h1>
        {isEditing ? (
            <ReviewEditor
                initialValue={review}
                onSubmit={handleReviewSubmit}
                onCancel={() => setIsEditing(false)}
            />
        ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex justify-between mb-4">
                    <div>
                        <h2 className="text-2xl font-bold">{review.team1}</h2>
                        {!(review.score1 === 0 && review.wicket1 === 0) && (
                            <p className="text-xl">{review.score1}/{review.wicket1}</p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">{review.team2}</h2>
                        {!(review.score2 === 0 && review.wicket2 === 0) && (
                            <p className="text-xl">{review.score2}/{review.wicket2}</p>
                        )}
                    </div>
                </div>
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: review.content }} />
                {user?.isAdmin && (
                    <div className="mt-6 flex justify-end space-x-4">
                        <Button onClick={() => setIsEditing(true)}>Edit Review</Button>
                        <Button onClick={handleDeleteReview} variant="destructive">Delete Review</Button>
                    </div>
                )}
            </div>
        )}
    </div>
);
}