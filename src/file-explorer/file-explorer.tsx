import { useState } from "react";
import { Folder, File, ChevronRight } from "lucide-react";

type FileNode = {
    name: string;
    type: "file";
    size: string;
    fileType: string;
    children?: never;
};

type FolderNode = {
    name: string;
    type: "folder";
    children: ExplorerNode[];
};

type ExplorerNode = FileNode | FolderNode;

const data: ExplorerNode[] = [
    {
        name: "Documents",
        type: "folder",
        children: [
            { name: "Resume.docx", type: "file", size: "120KB", fileType: "docx" },
            { name: "CoverLetter.pdf", type: "file", size: "80KB", fileType: "pdf" },
            {
                name: "Projects",
                type: "folder",
                children: [
                    { name: "Project1.txt", type: "file", size: "10KB", fileType: "txt" },
                    {
                        name: "Designs",
                        type: "folder",
                        children: [
                            { name: "Logo.svg", type: "file", size: "5KB", fileType: "svg" },
                            {
                                name: "NestedProjects",
                                type: "folder",
                                children: [
                                    { name: "ProjectA.txt", type: "file", size: "7KB", fileType: "txt" },
                                    {
                                        name: "InnerDesigns",
                                        type: "folder",
                                        children: [{ name: "Icon.svg", type: "file", size: "3KB", fileType: "svg" }]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: "Photos",
                type: "folder",
                children: [
                    { name: "Vacation.jpg", type: "file", size: "2MB", fileType: "jpg" },
                    { name: "Family.png", type: "file", size: "1.5MB", fileType: "png" },
                    {
                        name: "Events",
                        type: "folder",
                        children: [{ name: "Birthday.jpeg", type: "file", size: "3MB", fileType: "jpeg" }]
                    }
                ]
            },
            { name: "Readme.md", type: "file", size: "2KB", fileType: "md" }
        ]
    },

];

const Node = ({
    node,
    path = "",
    addNode,
    deleteNode,
}: {
    node: ExplorerNode;
    path?: string;
    addNode: (path: string, node: ExplorerNode) => void;
    deleteNode: (path: string) => void;
}) => {
    const [expanded, setExpanded] = useState(true);
    const isRoot = !path.includes("/");

    const handleDeleteNode = () => {
        if (window.confirm("Are you sure you want to delete this node?")) {
            deleteNode(path);
        }
    };


    if (node.type === "file") {
        return (
            <div className={`${isRoot ? "ml-8" : "ml-4.5"} flex items-center gap-2 my-1`}>
                <File /> {node.name} <span className="text-muted">({node.size})</span> <button onClick={handleDeleteNode} aria-label="delete-node" className="text-red-500">-</button>
            </div>
        );
    }

    const handleAddFolder = () => {
        const name = window.prompt("Folder name", "New Folder");
        if (!name) return;
        const newFolder: FolderNode = { name, type: "folder", children: [] };
        addNode(path, newFolder);
        setExpanded(true);
    };

    const handleAddFile = () => {
        const name = window.prompt("File name (with extension)", "new.txt");
        if (!name) return;
        const size = window.prompt("Size (e.g. 1KB)", "1KB") || "1KB";
        const fileType = name.split(".").pop() || "";
        const newFile: FileNode = { name, type: "file", size, fileType };
        addNode(path, newFile);
        setExpanded(true);
    };


    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 ml-1.5 my-1">
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        aria-label={expanded ? "collapse" : "expand"}
                        className="p-0"
                    >
                        {node.children && node.children.length > 0 && <ChevronRight className={`transform transition-transform ${expanded ? "rotate-90" : ""}`} />
                        }
                    </button>
                    <Folder />
                    <span className="ml-1">{node.name}</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleAddFile} aria-label="add-file">+ File</button>
                    <button onClick={handleAddFolder} aria-label="add-folder">+ Folder</button>
                    <button onClick={handleDeleteNode} aria-label="delete-node" className="text-red-500">-</button>
                </div>
            </div>

            {expanded && node.children.length > 0 && (
                <div className="ml-4 space-y-2">
                    {node.children.map((child, index) => (
                        <Node
                            key={`${path}/${index}`}
                            node={child}
                            path={path === "" ? `${index}` : `${path}/${index}`}
                            addNode={addNode}
                            deleteNode={deleteNode}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const FileExplorer = () => {
    const [initialData, setInitialData] = useState<ExplorerNode[]>(data);

    // Helper function to find the folder node at the given path
    const getTargetFolder = (root: ExplorerNode[], pathIndices: number[]): FolderNode | null => {
        let current: ExplorerNode = root[pathIndices[0]];

        for (let i = 1; i < pathIndices.length; i++) {
            if (current.type !== "folder") return null;
            current = current.children?.[pathIndices[i]];
            console.log(current)

            if (!current) return null;
        }

        return current.type === "folder" ? current : null;
    };

    const deleteNode = (path: string) => {
        setInitialData((prevData) => {
            // Clone the data to avoid mutating the original state
            const clonedData = JSON.parse(JSON.stringify(prevData)) as ExplorerNode[];

            // If path is empty, return the original data
            if (!path) return prevData;

            // Convert path string (e.g. "0/2/1") into an array of indices [0, 2, 1]
            const indices = path.split("/").map(Number);

            if (indices.length === 1) {
                const rootIndex = indices[0];
                if (rootIndex >= 0 && rootIndex < clonedData.length) {
                    clonedData.splice(rootIndex, 1);
                    return clonedData;
                } else {
                    console.warn("Invalid root index for deletion");
                    return prevData;
                }
            }

            // Find the parent folder of the target node
            const parentFolder = getTargetFolder(clonedData, indices.slice(0, -1));

            if (!parentFolder) {
                console.warn("Invalid path or target is not a folder");
                return prevData; // fallback to previous state if invalid
            }

            // Remove the target node from the parent's children
            parentFolder.children = parentFolder.children?.filter((_, i) => i !== indices[indices.length - 1]) || [];

            return clonedData;
        });
    };

    const addNode = (path: string, nodeToAdd: ExplorerNode) => {
        setInitialData((prevData) => {
            // Clone the data to avoid mutating the original state
            const clonedData = JSON.parse(JSON.stringify(prevData)) as ExplorerNode[];

            // If path is empty, add the new node at the root level
            if (!path) {
                clonedData.push(nodeToAdd);
                return clonedData;
            }

            // Convert path string (e.g. "0/2/1") into an array of indices [0, 2, 1]
            const indices = path.split("/").map(Number);



            // Find the folder at the specified path
            const targetFolder = getTargetFolder(clonedData, indices);

            if (!targetFolder) {
                console.warn("Invalid path or target is not a folder");
                return prevData; // fallback to previous state if invalid
            }

            // Initialize children if it doesn't exist
            targetFolder.children = targetFolder.children || [];

            // Add the new node to the folder's children
            targetFolder.children.push(nodeToAdd);

            return clonedData;
        });
    };


    return (
        <div className="h-screen w-screen p-10">
            {initialData.map((node, index) => (
                <Node key={`root-${index}-${node.name}`} node={node} path={`${index}`} addNode={addNode} deleteNode={deleteNode} />
            ))}
        </div>
    );
};

export default FileExplorer;