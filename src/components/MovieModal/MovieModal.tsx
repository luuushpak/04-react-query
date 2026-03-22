import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const BASIC_IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!movie) return null;
  const { backdrop_path, title, overview, release_date, vote_average } = movie;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleModalClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <img
          src={BASIC_IMG_URL + backdrop_path}
          alt={title}
          className={css.image}
        />
        <div className={css.content}>
          <h2>{title}</h2>
          <p>{overview}</p>
          <p>
            <strong>Release Date:</strong> {release_date}
          </p>
          <p>
            <strong>Rating:</strong> {vote_average + "/10"}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
