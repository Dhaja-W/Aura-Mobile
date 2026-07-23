import React, { useState } from 'react';
import { Star, Award, CheckCircle2, MessageSquare, Plus, X, Sparkles } from 'lucide-react';
import { PRESS_AWARDS, REVIEWS } from '../data/products';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewList, setReviewList] = useState<Review[]>(REVIEWS);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Form State
  const [authorName, setAuthorName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [ratingStars, setRatingStars] = useState(5);
  const [productChoice, setProductChoice] = useState('Aura 16 Pro Max');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev: Review = {
      id: `rev-custom-${Date.now()}`,
      author: authorName,
      role: userRole || 'Verified Customer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      rating: ratingStars,
      date: 'Just now',
      title: reviewTitle || 'Exceptional craftsmanship',
      comment: commentText,
      verified: true,
      productName: productChoice
    };

    setReviewList([newRev, ...reviewList]);
    setIsWriteModalOpen(false);
    setAuthorName('');
    setUserRole('');
    setReviewTitle('');
    setCommentText('');
  };

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Accolades Row */}
        <div className="mb-20 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full text-xs font-mono font-semibold text-neutral-800">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>International Design Recognition</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-950 font-sans tracking-tight">
              Award Winner 2026.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESS_AWARDS.map((press) => (
              <div
                key={press.id}
                className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-2">
                    <span className="font-bold text-neutral-900">{press.publication}</span>
                    <span>{press.year}</span>
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-md inline-block mb-3">
                    {press.award}
                  </div>
                  <p className="text-xs text-neutral-600 italic leading-relaxed">
                    "{press.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pt-12 border-t border-neutral-100">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-semibold mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-900" />
              <span>Verified Owner Testimonials</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 font-sans">
              Rated 4.9/5 by 800+ Owners.
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-neutral-600 font-bold">4.9 / 5.0 Overall Satisfaction</span>
            </div>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-3 rounded-full transition-colors flex items-center gap-2 shadow-xs cursor-pointer self-start md:self-auto"
            id="write-review-btn"
          >
            <Plus className="w-4 h-4" />
            <span>Write Owner Review</span>
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-400">{rev.date}</span>
                </div>

                <div className="font-extrabold text-sm text-neutral-950">{rev.title}</div>
                <p className="text-xs text-neutral-600 leading-relaxed font-sans">{rev.comment}</p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 mt-6 border-t border-neutral-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-9 h-9 rounded-full object-cover border border-neutral-200"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-xs text-neutral-900 flex items-center gap-1.5">
                    <span>{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified Owner" />
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-mono">
                    {rev.role} • <span className="text-neutral-700 font-semibold">{rev.productName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Write Review Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <h3 className="font-extrabold text-base text-neutral-950">Share Your Aura Experience</h3>
                </div>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. David Miller"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-hidden focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Role / Profession</label>
                  <input
                    type="text"
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    placeholder="e.g. Industrial Designer, Tech Enthusiast"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-hidden focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Product Purchased</label>
                  <select
                    value={productChoice}
                    onChange={(e) => setProductChoice(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-hidden focus:border-neutral-950"
                  >
                    <option value="Aura 16 Pro Max">Aura 16 Pro Max</option>
                    <option value="Aura 16 Pro">Aura 16 Pro</option>
                    <option value="Aura Fold Ultra">Aura Fold Ultra</option>
                    <option value="Aura Studio Edition">Aura Studio Edition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRatingStars(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${star <= ratingStars ? 'fill-amber-400' : 'text-neutral-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Flawless titanium finish and incredible camera"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-hidden focus:border-neutral-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-neutral-700 mb-1">Detailed Review</label>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Describe the build quality, display clarity, camera optics, or battery life..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 outline-hidden focus:border-neutral-950"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWriteModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
