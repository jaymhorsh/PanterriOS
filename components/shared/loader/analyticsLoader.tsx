'use client';
import React from 'react';

export default function AnalyticsLoader() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-10">
      <div className="animate-pulse">
        <div className="space-y-6">
          <section className="bg-white  rounded-lg p-6 shadow-sm">
            <div className="h-6 w-1/4 rounded bg-gray-200  mb-4" />
            <div className="grid grid-cols-3 gap-4">
              <div className="h-24 rounded bg-gray-200 " />
              <div className="h-24 rounded bg-gray-200 " />
              <div className="h-24 rounded bg-gray-200 " />
            </div>
          </section>

          <section className="bg-white  rounded-lg p-6 shadow-sm">
            <div className="h-6 w-1/4 rounded bg-gray-200  mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="h-40 rounded bg-gray-200 " />
              <div className="h-40 rounded bg-gray-200 " />
              <div className="h-40 rounded bg-gray-200 " />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
