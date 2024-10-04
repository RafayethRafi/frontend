import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const QuillNoSSRWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const ReviewEditor = ({ initialValue, onSubmit, onCancel }) => {
  const [review, setReview] = useState(initialValue || {
    team1: "",
    team2: "",
    score1: "",
    score2: "",
    wicket1: "",
    wicket2: "",
    content: "",
  });

  useEffect(() => {
    if (initialValue) {
      setReview(initialValue);
    }
  }, [initialValue]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setReview(prev => ({ ...prev, content }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...review,
      score1: parseInt(review.score1) || 0,
      score2: parseInt(review.score2) || 0,
      wicket1: parseInt(review.wicket1) || 0,
      wicket2: parseInt(review.wicket2) || 0,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">{initialValue ? "Edit Review" : "Create Review"}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="team1">Team 1</Label>
          <Input
            id="team1"
            name="team1"
            value={review.team1}
            onChange={handleInputChange}
            placeholder="Team 1 Name"
          />
        </div>
        <div>
          <Label htmlFor="team2">Team 2</Label>
          <Input
            id="team2"
            name="team2"
            value={review.team2}
            onChange={handleInputChange}
            placeholder="Team 2 Name"
          />
        </div>
        <div>
          <Label htmlFor="score1">Score 1</Label>
          <Input
            id="score1"
            name="score1"
            type="number"
            value={review.score1}
            onChange={handleInputChange}
            placeholder="Score 1"
          />
        </div>
        <div>
          <Label htmlFor="score2">Score 2</Label>
          <Input
            id="score2"
            name="score2"
            type="number"
            value={review.score2}
            onChange={handleInputChange}
            placeholder="Score 2"
          />
        </div>
        <div>
          <Label htmlFor="wicket1">Wickets 1</Label>
          <Input
            id="wicket1"
            name="wicket1"
            type="number"
            value={review.wicket1}
            onChange={handleInputChange}
            placeholder="Wickets 1"
          />
        </div>
        <div>
          <Label htmlFor="wicket2">Wickets 2</Label>
          <Input
            id="wicket2"
            name="wicket2"
            type="number"
            value={review.wicket2}
            onChange={handleInputChange}
            placeholder="Wickets 2"
          />
        </div>
      </div>
      <div>
        <Label>Review Content</Label>
        <div className="bg-white dark:bg-gray-700 rounded-md mt-1">
          <QuillNoSSRWrapper
            value={review.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            theme="snow"
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <style jsx global>{`
          .ql-toolbar {
            background-color: #f3f4f6;
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
          }
          .dark .ql-toolbar {
            background-color: #4b5563;
            border-color: #6b7280;
          }
          .dark .ql-toolbar .ql-stroke {
            stroke: #e5e7eb;
          }
          .dark .ql-toolbar .ql-fill {
            fill: #e5e7eb;
          }
          .dark .ql-toolbar .ql-picker {
            color: #e5e7eb;
          }
        `}</style>
      </div>
      <div className="flex justify-end space-x-2">
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="default">
          {initialValue ? "Update Review" : "Submit Review"}
        </Button>
      </div>
    </div>
  );
};

export default ReviewEditor;