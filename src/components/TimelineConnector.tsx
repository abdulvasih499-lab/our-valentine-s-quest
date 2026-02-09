const TimelineConnector = () => {
  return (
    <div className="flex justify-center -my-8 relative z-0">
      <div className="w-px h-24 relative">
        {/* Gradient line */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />
        {/* Heart in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-lg animate-pulse">
          ♥
        </div>
      </div>
    </div>
  );
};

export default TimelineConnector;
