import React from 'react'

export default function ContentRefreshButton({ onRefresh, loading, spec }) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className={`inline-flex items-center gap-2 px-4 py-2 ${spec.cornerRadius} font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{
        backgroundColor: spec.palette[3],
        color: spec.palette[0]
      }}
    >
      {loading ? (
        <>
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
          <span>Refreshing...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>New Content</span>
        </>
      )}
    </button>
  )
}
