'use client';
export const runtime = "edge";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from 'next/navigation';
import CricketCard from "@/components/CricketCard";
import ReviewEditor from "@/components/ReviewEditor";
import useAuth from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function LeagueInsightsPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [league, setLeague] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchLeague = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/league/${id}`);
      if (!response.ok) throw new Error('Failed to fetch league');
      const data = await response.json();
      setLeague(data);
    } catch (error) {
      console.error('Error fetching league:', error);
      toast({
        title: "Error",
        description: "Failed to fetch league. Please try again.",
        variant: "destructive",
      });
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/cricket_reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      // Filter reviews for the current league
    //   const filteredReviews = data.filter(review => review.league_id === parseInt(id));
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews. Please try again.",
        variant: "destructive",
      });
    }
  }, [id]);

  useEffect(() => {
    fetchLeague();
    fetchReviews();
  }, [fetchLeague, fetchReviews]);

  const handleReviewSubmit = async (reviewData) => {
    if (!token) {
      console.log('Token not available, cannot submit review');
      return;
    }

    try {
      const url = editingReviewId 
        ? `${api}/admin/edit_cricket_review?review_id_to_edit=${editingReviewId}`
        : `${api}/admin/post_cricket_review?league_id=${id}`;

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

  const handleDeleteReview = async (reviewId) => {
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
      
      await fetchReviews();
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error",
        description: "Failed to delete review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (id) => {
    setEditingReviewId(id);
    setIsCreating(true);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setEditingReviewId(null);
  };

  if (isLoading || !league) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{league.name} Insights</h1>
      {user?.isAdmin && (
        <div className="mb-6">
          <Button onClick={handleCreateClick} className="w-full">
            Create New Review
          </Button>
        </div>
      )}
      {reviews.length === 0 && !isCreating && (
        <p className="text-center text-muted-foreground">No reviews available for this league</p>
      )}
      {isCreating && (
        <ReviewEditor
          initialValue={editingReviewId ? reviews.find(r => r.id === editingReviewId) : null}
          onSubmit={handleReviewSubmit}
          onCancel={() => {
            setIsCreating(false);
            setEditingReviewId(null);
          }}
        />
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <CricketCard
            key={review.id}
            review={review}
            isAdmin={user?.isAdmin}
            onEditClick={() => handleEditClick(review.id)}
            onDeleteClick={() => handleDeleteReview(review.id)}
            onShowReview={() => router.push(`/cricket/${id}/reviews/${review.id}`)}
          />
        ))}
      </div>
    </div>
  );
}