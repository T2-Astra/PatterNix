"use client";

import { useEffect, useState } from "react";
import { Star, Github, ExternalLink, Target, Rocket, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContributePage() {
  const [stars, setStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const targetStars = 20;

  useEffect(() => {
    // Fetch GitHub stars count
    const fetchStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/T2-Astra/T2-Astra', {
          cache: 'no-cache' // Ensure fresh data
        });
        const data = await response.json();
        setStars(data.stargazers_count || 0);
      } catch (error) {
        console.error('Error fetching stars:', error);
        setStars(0);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchStars();

    // Auto-refresh every 30 seconds to show new stars
    const interval = setInterval(fetchStars, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((stars / targetStars) * 100, 100);
  const remainingStars = Math.max(targetStars - stars, 0);

  const handleContribute = () => {
    window.open('https://github.com/T2-Astra/T2-Astra', '_blank', 'noopener,noreferrer');
  };

  const handleProfile = () => {
    window.open('https://github.com/T2-Astra', '_blank', 'noopener,noreferrer');
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/repos/T2-Astra/T2-Astra', {
        cache: 'no-cache'
      });
      const data = await response.json();
      setStars(data.stargazers_count || 0);
    } catch (error) {
      console.error('Error fetching stars:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="h-4 w-4" />
            Project Goal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Help PatterNix Grow! 🌟
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            We&apos;re working towards our first milestone. Your support means everything!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600 fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">GitHub Stars</h2>
                <p className="text-gray-600">Help us reach our goal!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <div className="text-3xl font-bold text-gray-900">
                  {loading ? '...' : stars}
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  title="Refresh star count"
                >
                  <RefreshCw className={`h-4 w-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <div className="text-sm text-gray-500">of {targetStars} stars</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg mb-6">
            {stars >= targetStars ? (
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Rocket className="h-5 w-5" />
                <span className="font-medium">🎉 Goal achieved! Project will be hosted soon!</span>
              </div>
            ) : (
              <div className="text-gray-700">
                <span className="font-medium">{remainingStars} more stars needed</span> to unlock project hosting!
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleContribute}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Star className="h-5 w-5" />
              Star on GitHub
            </Button>
            <Button
              onClick={handleProfile}
              variant="outline"
              className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Github className="h-5 w-5" />
              View Profile
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Github className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Contribute</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Star my GitHub profile repository to help me reach 20 stars and unlock PatterNix hosting!
            </p>
            <Button
              onClick={handleContribute}
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Star My Profile
            </Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Rocket className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Once we reach 20 stars, PatterNix will be hosted live for everyone to use and enjoy!
            </p>
            <div className="text-sm text-gray-500">
              🚀 Live hosting coming soon
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => window.location.href = '/'}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to PatterNix
          </Button>
        </div>
      </div>
    </div>
  );
}