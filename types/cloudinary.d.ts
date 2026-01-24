export type CloudinaryUpload = {
  file: File;
  folder?: string;
  resourceType?: "auto" | "image";
};

export type CloudinaryDelete = {
  publicId?: string;
  url?: string;
  resourceType?: "auto" | "image";
};
