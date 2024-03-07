import { getCookie } from "cookies-next";
import { useMutation, useQuery, useQueryClient } from "react-query";

import api from "../../util/api";

// List of Property
export const GetPropertyList = (
  PageNumber: any,
  Keyword: any,
  RowNumber: number,
  status?: string
) => {
  return useQuery(
    ["Property-List", PageNumber, Keyword, RowNumber, status],
    () => {
      return api.get(
        `/admin/property/unit?page=${PageNumber}&paginate=${RowNumber}&keywords=${Keyword}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const GetPrintPropertyList = () => {
  return useQuery(
    "Property-List-Print",
    () => {
      return api.get(`/admin/property/unit`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const GetPropertyListDraft = () => {
  return useQuery(
    ["Property-draft-list"],
    () => {
      return api.get(`/admin/property/unit?status=draft`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
// Import
export const PropertyImport = (onSuccess: any, ImportError: any) => {
  return useMutation(
    (data: FormData) => {
      return api.post(`/admin/property/unit/import`, data, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onSuccess: onSuccess,
      onError: ImportError,
    }
  );
};
// Show Property Detail
export const GetPropertyDetail = (id: any) => {
  return useQuery(["get-property-detail", id], () => {
    return api.get(`/admin/property/unit/${id}`, {
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    });
  });
};

// Create Property
export const PostProperty = (success: any, error: any) => {
  return useMutation(
    (Payload: any) => {
      return api.post("/admin/property/unit?save=1", Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// save as draft
export const PostDraftProperty = (success: any, error: any) => {
  return useMutation(
    (Payload: any) => {
      return api.post("/admin/property/unit?draft=1", Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Update Property
export const UpdateProperty = (success: any, error: any, id: any) => {
  return useMutation(
    (Payload: any) => {
      return api.put(`/admin/property/unit/${id}?save=1`, Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// update as draft Property
export const UpdateDraftProperty = (success: any, error: any, id: any) => {
  return useMutation(
    (Payload: any) => {
      return api.put(`/admin/property/unit/${id}?draft=1`, Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};

// Create Project
export const PostProject = (success: any, error: any) => {
  return useMutation(
    (Payload: any) => {
      return api.post("/admin/property/project", Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Get Project
export const GetProject = (Keyword: string) => {
  return useQuery(["get-project", Keyword], () => {
    return api.get(`/admin/property/project?keywords=${Keyword}`, {
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    });
  });
};
// Delete Project
export const DeleteProject = (success: any, error: any) => {
  return useMutation(
    (id: any) => {
      return api.delete(`/admin/property/project/${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Update Project
export const UpdateProject = (success: any, error: any, id: any) => {
  return useMutation(
    (Payload: any) => {
      return api.put(`/admin/property/project/${id}`, Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Create Tower
export const PostTower = (success: any, error: any) => {
  return useMutation(
    (Payload: any) => {
      return api.post("/admin/property/tower", Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Get Tower
export const GetTower = (Keyword: string, project_id: any) => {
  return useQuery(
    ["get-tower", Keyword, project_id],
    () => {
      return api.get(
        `/admin/property/tower?keywords=${Keyword}&project_id=${project_id}`,
        {
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        }
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
// Delete Tower
export const DeleteTower = (success: any, error: any) => {
  return useMutation(
    (id: any) => {
      return api.delete(`/admin/property/tower/${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Update Tower
export const UpdateTower = (success: any, error: any, id: any) => {
  return useMutation(
    (Payload: any) => {
      return api.put(`/admin/property/tower/${id}`, Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};

// Create Floor
export const PostFloor = (success: any, error: any) => {
  return useMutation(
    (Payload: any) => {
      return api.post("/admin/property/floor", Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Get Floor
export const GetFloor = (Keyword: string, tower_id: any) => {
  return useQuery(["get-floor", Keyword, tower_id], () => {
    return api.get(
      `/admin/property/floor?keywords=${Keyword}&tower_id=${tower_id}`,
      {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      }
    );
  });
};
// Delete Floor
export const DeleteFloor = (success: any, error: any) => {
  return useMutation(
    (id: any) => {
      return api.delete(`/admin/property/floor/${id}`, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};
// Update Floor
export const UpdateFloor = (success: any, error: any, id: any) => {
  return useMutation(
    (Payload: any) => {
      return api.put(`/admin/property/floor/${id}`, Payload, {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      });
    },
    {
      onError: error,
      onSuccess: success,
    }
  );
};

// Get Developer
export const GetDeveloper = (Keyword: string) => {
  return useQuery(["get-developer", Keyword], () => {
    return api.get(
      `/admin/property/unit/developer-options?keywords=${Keyword}`,
      {
        headers: {
          Authorization: "Bearer " + getCookie("user"),
        },
      }
    );
  });
};
