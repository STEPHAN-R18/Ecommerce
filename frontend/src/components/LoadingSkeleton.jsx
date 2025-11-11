import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="skeleton-grid">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton-card">
          <Skeleton height={180} />
          <Skeleton height={20} style={{ marginTop: 8 }} />
          <Skeleton height={20} width="60%" />
        </div>
      ))}
    </div>
  );
}
