
import React from "react";

import "../styles/StudioPlatea.css";
interface SeatMapProps {
  occupiedSeats: number[];
  botsInGioco?: string[];
  fullPlatea?: { name: string; gender: string }[];
}

const StudioPlatea: React.FC<SeatMapProps> = ({ occupiedSeats }) => {
  const rows = 4;
  const cols = 20;
  const seatSize = 18;
  const seatGap = 6;

  const seats = Array.from({ length: rows * cols }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const x = col * (seatSize + seatGap);
    const y = row * (seatSize + seatGap);
    const isOccupied = occupiedSeats.includes(i + 1);

    return (
      <rect
        key={i}
        x={x}
        y={y}
        width={seatSize}
        height={seatSize}
        rx={4}
        ry={4}
        className={`seat ${isOccupied ? "occupied" : "available"}`}
      />
    );
  });

  const width = cols * (seatSize + seatGap);
  const height = rows * (seatSize + seatGap);

  return (
    <svg
      className="seat-map studio-seat-map"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {seats}
    </svg>
  );
};

export default StudioPlatea;
