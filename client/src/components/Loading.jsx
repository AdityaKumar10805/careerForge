function Loading() {
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "6px solid #e5e7eb",
            borderTop: "6px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
  
        <h2
          style={{
            color: "#2563eb",
            fontWeight: "600",
            fontSize: "22px",
          }}
        >
          Loading CareerForge...
        </h2>
  
        <style>
          {`
            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    );
  }
  
  export default Loading;