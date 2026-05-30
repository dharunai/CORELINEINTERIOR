import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import crypto from "node:crypto";
import { toast } from "sonner";
import { Upload, Plus, Loader2, Trash2, LogOut, Edit2, Check } from "lucide-react";

// ─── Server Function: Add Project ──────────────────────────────────────────────
const addProjectFn = createServerFn({ method: "POST" }).handler(async (ctx) => {
  try {
    const req = ctx.request;
    const data: any = ctx.data;
    const getField = (key: string) => data instanceof FormData ? data.get(key) : data[key];
    
    const title = getField("title") as string;
    const type = getField("type") as string;
    const location = getField("location") as string;
    const year = getField("year") as string;
    const desc = getField("desc") as string;
    const tagsStr = getField("tags") as string;
    const imageFile = getField("image") as File;

    if (!title || !type || !location || !year || !desc || !tagsStr || !imageFile || imageFile.size === 0) {
      return { error: "All fields are required." };
    }

    const tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);

    const ext = imageFile.name.split('.').pop() || 'jpeg';
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const uploadDir = path.resolve(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, fileName);

    await fs.mkdir(uploadDir, { recursive: true });

    const arrayBuffer = await imageFile.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    const newProject = {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      title,
      type,
      location,
      year,
      image: `/uploads/${fileName}`,
      desc,
      tags
    };

    const dataPath = path.resolve(process.cwd(), "public", "data", "projects.json");
    let projects = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      projects = JSON.parse(fileData);
    } catch (e) {}

    projects.unshift(newProject);
    await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));

    return { success: true, project: newProject };
  } catch (error: any) {
    return { error: error.message || "Failed to add project" };
  }
});

// ─── Server Function: Edit Project ─────────────────────────────────────────────
const editProjectFn = createServerFn({ method: "POST" }).handler(async (ctx) => {
  try {
    const req = ctx.request;
    const data: any = ctx.data;
    const getField = (key: string) => data instanceof FormData ? data.get(key) : data[key];
    
    const originalSlug = getField("originalSlug") as string;
    const title = getField("title") as string;
    const type = getField("type") as string;
    const location = getField("location") as string;
    const year = getField("year") as string;
    const desc = getField("desc") as string;
    const tagsStr = getField("tags") as string;
    const imageFile = getField("image") as File | null;

    if (!originalSlug || !title || !type || !location || !year || !desc || !tagsStr) {
      return { error: "Required fields are missing." };
    }

    const dataPath = path.resolve(process.cwd(), "public", "data", "projects.json");
    let projects = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      projects = JSON.parse(fileData);
    } catch (e) {
      return { error: "Projects data not found." };
    }

    const projectIndex = projects.findIndex((p: any) => p.slug === originalSlug);
    if (projectIndex === -1) {
      return { error: "Project not found." };
    }

    const project = projects[projectIndex];
    project.title = title;
    project.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''); 
    project.type = type;
    project.location = location;
    project.year = year;
    project.desc = desc;
    project.tags = tagsStr.split(",").map(t => t.trim()).filter(Boolean);

    // If a new image was uploaded, process it
    if (imageFile && imageFile.size > 0) {
      const ext = imageFile.name.split('.').pop() || 'jpeg';
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const uploadDir = path.resolve(process.cwd(), "public", "uploads");
      const filePath = path.join(uploadDir, fileName);

      await fs.mkdir(uploadDir, { recursive: true });
      const arrayBuffer = await imageFile.arrayBuffer();
      await fs.writeFile(filePath, Buffer.from(arrayBuffer));
      
      // Delete old image if it's an uploaded file
      if (project.image && project.image.startsWith("/uploads/")) {
        try {
          const oldImagePath = path.join(process.cwd(), "public", project.image);
          await fs.unlink(oldImagePath);
        } catch (e) {
          console.warn("Failed to delete old image:", e);
        }
      }

      project.image = `/uploads/${fileName}`;
    }

    await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));

    return { success: true, project };
  } catch (error: any) {
    return { error: error.message || "Failed to edit project" };
  }
});

// ─── Server Function: Delete Project ───────────────────────────────────────────
const deleteProjectFn = createServerFn({ method: "POST" }).handler(async (ctx) => {
  try {
    const req = ctx.request;
    const data: any = ctx.data;
    const slug = data instanceof FormData ? data.get("slug") as string : data.slug as string;

    if (!slug) return { error: "Project slug is required." };

    const dataPath = path.resolve(process.cwd(), "public", "data", "projects.json");
    let projects = [];
    try {
      const fileData = await fs.readFile(dataPath, "utf-8");
      projects = JSON.parse(fileData);
    } catch (e) {
      return { error: "Projects data not found." };
    }

    const projectIndex = projects.findIndex((p: any) => p.slug === slug);
    if (projectIndex === -1) {
      return { error: "Project not found." };
    }

    const [deletedProject] = projects.splice(projectIndex, 1);

    await fs.writeFile(dataPath, JSON.stringify(projects, null, 2));

    if (deletedProject.image && deletedProject.image.startsWith("/uploads/")) {
      try {
        const imagePath = path.join(process.cwd(), "public", deletedProject.image);
        await fs.unlink(imagePath);
      } catch (imgError) {
        console.warn("Could not delete image file:", imgError);
      }
    }

    return { success: true, slug };
  } catch (error: any) {
    return { error: error.message || "Failed to delete project" };
  }
});

// ─── Server Function: Get Projects ─────────────────────────────────────────────
const fetchProjectsListFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const dataPath = path.resolve(process.cwd(), "public", "data", "projects.json");
    const fileData = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(fileData);
  } catch (e) {
    return [];
  }
});

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/admin")({
  loader: () => fetchProjectsListFn(),
  component: AdminPage,
});

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Read local storage on mount
  useEffect(() => {
    const auth = localStorage.getItem("coreline_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = formData.get("username");
    const pass = formData.get("password");

    if (user === "thegenworks" && pass === "coreline") {
      localStorage.setItem("coreline_admin_auth", "true");
      setIsAuthenticated(true);
      toast.success("Welcome back!");
    } else {
      toast.error("Invalid credentials.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("coreline_admin_auth");
    setIsAuthenticated(false);
    toast("Logged out successfully.");
  };

  if (isCheckingAuth) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm bg-foreground/5 p-8 border border-border/50">
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl">Admin Login</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-widest mt-2">CoreLine Interior</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Username</label>
              <input 
                type="text" 
                name="username" 
                required 
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <input 
                type="password" 
                name="password" 
                required 
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-foreground text-background py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const initialProjects = Route.useLoaderData() as any[];
  const [projects, setProjects] = useState<any[]>(initialProjects || []);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // Form State to handle editing
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    location: "",
    year: "",
    desc: "",
    tags: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(editingProject ? editingProject.image : null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (project: any) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      type: project.type || "",
      location: project.location || "",
      year: project.year || "",
      desc: project.desc || "",
      tags: project.tags?.join(", ") || ""
    });
    setPreviewUrl(project.image);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setFormData({ title: "", type: "", location: "", year: "", desc: "", tags: "" });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submittedData = new FormData(e.currentTarget);
    
    try {
      if (editingProject) {
        submittedData.append("originalSlug", editingProject.slug);
        const result = await editProjectFn({ data: submittedData });
        
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Project updated successfully!");
          setProjects(prev => prev.map(p => p.slug === editingProject.slug ? result.project : p));
          handleCancelEdit();
          (e.target as HTMLFormElement).reset();
        }
      } else {
        const result = await addProjectFn({ data: submittedData });
        
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Project added successfully!");
          setProjects(prev => [result.project, ...prev]);
          handleCancelEdit();
          (e.target as HTMLFormElement).reset();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const formData = new FormData();
      formData.append("slug", slug);
      const result = await deleteProjectFn({ data: formData });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Project deleted successfully!");
        setProjects(prev => prev.filter(p => p.slug !== slug));
        if (editingProject?.slug === slug) {
          handleCancelEdit();
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container-luxe max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1 className="font-display text-4xl md:text-5xl mt-4">Manage Projects</h1>
            <p className="text-muted-foreground mt-4 text-sm max-w-lg">
              Upload new projects, edit or remove existing ones. Changes reflect instantly on the public gallery.
            </p>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Add/Edit Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8 bg-foreground/5 p-8 border border-border/50 relative sticky top-32">
              {editingProject && (
                <div className="absolute top-0 right-0 bg-accent text-white text-[10px] tracking-widest uppercase px-3 py-1 m-4">
                  Editing Mode
                </div>
              )}
              <div className="space-y-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest border-b border-border/50 pb-4">
                  {editingProject ? "Edit Project Details" : "Add New Project"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-xs uppercase tracking-widest text-muted-foreground">Title</label>
                    <input 
                      type="text" 
                      id="title" 
                      name="title" 
                      value={formData.title}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-xs uppercase tracking-widest text-muted-foreground">Type</label>
                    <select 
                      id="type" 
                      name="type" 
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                    >
                      <option value="">Select Type</option>
                      <option value="Home Interiors">Home Interiors</option>
                      <option value="Apartment Interiors">Apartment Interiors</option>
                      <option value="Luxury Villa">Luxury Villa</option>
                      <option value="Modular Kitchens">Modular Kitchens</option>
                      <option value="Office Interiors">Office Interiors</option>
                      <option value="Commercial Spaces">Commercial Spaces</option>
                      <option value="Custom Furniture">Custom Furniture</option>
                      <option value="Bedroom Interiors">Bedroom Interiors</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="location" className="text-xs uppercase tracking-widest text-muted-foreground">Location</label>
                    <input 
                      type="text" 
                      id="location" 
                      name="location" 
                      value={formData.location}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="year" className="text-xs uppercase tracking-widest text-muted-foreground">Year</label>
                    <input 
                      type="text" 
                      id="year" 
                      name="year" 
                      value={formData.year}
                      onChange={handleInputChange}
                      required 
                      className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="desc" className="text-xs uppercase tracking-widest text-muted-foreground">Description</label>
                  <textarea 
                    id="desc" 
                    name="desc" 
                    value={formData.desc}
                    onChange={handleInputChange}
                    required 
                    rows={2}
                    className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="text-xs uppercase tracking-widest text-muted-foreground">Tags</label>
                  <input 
                    type="text" 
                    id="tags" 
                    name="tags" 
                    value={formData.tags}
                    onChange={handleInputChange}
                    required 
                    className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                    placeholder="Comma separated"
                  />
                </div>
              </div>

              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Cover Image</label>
                  <div className="relative border-2 border-dashed border-border/60 bg-background hover:bg-foreground/5 transition-colors group cursor-pointer overflow-hidden aspect-[3/1] flex items-center justify-center">
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      required={!editingProject} 
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                        <Upload className="h-6 w-6 mb-2" />
                        <span className="text-xs">Click or drag image</span>
                        {editingProject && <span className="text-[10px] mt-1 opacity-60">(Optional: Upload to replace current)</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                {editingProject && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    className="flex-1 bg-transparent border border-border text-foreground py-4 text-xs uppercase tracking-[0.2em] hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-[2] bg-foreground text-background py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                  ) : editingProject ? (
                    <><Check className="h-4 w-4" /> Save Changes</>
                  ) : (
                    <><Plus className="h-4 w-4" /> Publish Project</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Existing Projects List */}
          <div className="lg:col-span-5">
            <div className="bg-foreground/5 p-8 border border-border/50 h-full flex flex-col">
              <h3 className="text-sm font-semibold uppercase tracking-widest border-b border-border/50 pb-4 mb-6 shrink-0">
                Current Projects
              </h3>
              
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0">
                {projects.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No projects found.</p>
                ) : (
                  projects.map((p) => (
                    <div key={p.slug} className={`flex items-center gap-4 p-4 bg-background border transition-colors ${editingProject?.slug === p.slug ? 'border-accent ring-1 ring-accent/20' : 'border-border hover:border-border/80'}`}>
                      <div className="w-16 h-16 shrink-0 bg-foreground/10 overflow-hidden relative">
                        {p.image ? (
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{p.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{p.type}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button 
                          onClick={() => handleEditClick(p)}
                          className={`p-2 transition-colors ${editingProject?.slug === p.slug ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
                          title="Edit project"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(p.slug)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
