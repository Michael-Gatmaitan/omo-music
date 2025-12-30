import { useState, useEffect, useRef, useCallback } from "react";
import { Suspense, lazy } from "react";
import { MusicBlockFallback } from "./_FallbackComponents";

const MusicBlock = lazy(() => import("./MusicBlock"));

// Number of items to render initially and per batch
const INITIAL_ITEMS = 20;
const ITEMS_PER_BATCH = 20;

const VirtualizedMusicList = ({
  musicDataTable,
  displayArtistImage = false,
}) => {
  const [visibleItems, setVisibleItems] = useState(INITIAL_ITEMS);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  // Reset visible items when musicDataTable changes
  useEffect(() => {
    setVisibleItems(INITIAL_ITEMS);
  }, [musicDataTable]);

  // Intersection Observer callback
  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        !isLoading &&
        visibleItems < musicDataTable.length
      ) {
        setIsLoading(true);
        // Use requestAnimationFrame to batch the state update
        requestAnimationFrame(() => {
          setVisibleItems((prev) => {
            const next = Math.min(
              prev + ITEMS_PER_BATCH,
              musicDataTable.length
            );
            setIsLoading(false);
            return next;
          });
        });
      }
    },
    [isLoading, visibleItems, musicDataTable.length]
  );

  // Set up Intersection Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const options = {
      root: null,
      rootMargin: "200px", // Start loading 200px before reaching the sentinel
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(sentinel);
    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleIntersection, visibleItems, hasMore]);

  // Items to render
  const itemsToRender = musicDataTable.slice(0, visibleItems);
  const hasMore = visibleItems < musicDataTable.length;

  return (
    <div className="music-route route-parent">
      {itemsToRender.map((data, i) => (
        <Suspense fallback={<MusicBlockFallback />} key={`${data}-${i}`}>
          <MusicBlock
            musicDataTable={musicDataTable}
            data={data}
            displayArtistImage={displayArtistImage}
          />
        </Suspense>
      ))}

      {/* Sentinel element for Intersection Observer */}
      {hasMore && (
        <div
          ref={sentinelRef}
          style={{
            height: "20px",
            width: "100%",
          }}
          aria-hidden="true"
        />
      )}

      {/* Loading indicator */}
      {isLoading && hasMore && (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <MusicBlockFallback />
        </div>
      )}
    </div>
  );
};

export default VirtualizedMusicList;
