'use client';

import React, { useState, useEffect, useCallback } from "react";
import FootballCard from "@/components/FootballCard";
import FootballReviewEditor from "@/components/FootballReviewEditor";
import useAuth from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function Football() {
  const { user, token, isLoading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/football_reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleReviewSubmit = async (reviewData) => {
    if (!token) {
      console.log('Token not available, cannot submit review');
      return;
    }

    try {
      const url = editingReviewId 
        ? `${api}/admin/edit_football_review?review_id_to_edit=${editingReviewId}`
        : `${api}/admin/post_football_review`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData)
      });

      if (!response.ok) throw new Error('Failed to submit review');
      
      await fetchReviews();
      setIsCreating(false);
      setEditingReviewId(null);
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: editingReviewId ? "Review updated successfully" : "Review created successfully",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (id) => {
    setEditingReviewId(id);
    setIsCreating(false);
    setSelectedReview(null);
    setIsDialogOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditingReviewId(null);
    setSelectedReview(null);
    setIsDialogOpen(true);
  };

  const handleShowReview = (review) => {
    setSelectedReview(review);
    setEditingReviewId(null);
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Football Insights</h1>
      {user?.isAdmin && (
        <div className="mb-6">
          <Button onClick={handleCreateClick} className="w-full">
            Create New Review
          </Button>
        </div>
      )}
      {reviews.length === 0 && !isCreating && (
        <p className="text-center text-muted-foreground">No reviews available</p>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <FootballCard
            key={review.id}
            review={review}
            isAdmin={user?.isAdmin}
            onEditClick={() => handleEditClick(review.id)}
            onShowReview={() => handleShowReview(review)}
          />
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-background dark:bg-gray-800">
          {editingReviewId || isCreating ? (
            <FootballReviewEditor
              initialValue={editingReviewId ? reviews.find(r => r.id === editingReviewId) : null}
              onSubmit={handleReviewSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          ) : selectedReview && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{selectedReview.team1} vs {selectedReview.team2}</h2>
              <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: selectedReview.content }} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}