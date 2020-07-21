let ENTRY_POINT = "";
if (process.env.NODE_ENV === "development") {
  ENTRY_POINT = "http://localhost:8000/";
} else {
  ENTRY_POINT = "https://reckonup.famoce-succellion.com/";
}

export { ENTRY_POINT };
