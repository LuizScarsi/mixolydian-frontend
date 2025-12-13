import { useState } from "react";
import { api } from "../services/api";
import DataCards from "./DataCards";
import CrudForm from "./CrudForm";
import MusicSelector from "./MusicSelector";

import { isAxiosError } from 'axios'; 

interface Props {
  route: string;
  data: any[];
  getAll: () => void;
}

export default function CrudContainer({ route, data, getAll }: Props) {
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedMusics, setSelectedMusics] = useState<number[]>([]);



  // Função centralizada para tratar e exibir erros de API
  const handleApiError = (err: unknown) => {
    let errorMessage = 'Ocorreu um erro inesperado na comunicação.';

    if (isAxiosError(err) && err.response) {
      
      // 1. Tenta ler a mensagem detalhada enviada pelo nosso backend 
      // (Ex: "Esta música está em uma ou mais playlists..." ou erro de validação)
      if (err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; 
      } 
      // 2. Erros de Autenticação/Sessão (401 Unauthorized)
      else if (err.response.status === 401) {
        errorMessage = 'Sessão expirada ou não autorizada. Faça login novamente.';
      } 
      // 3. Erros de Autorização/Permissão (403 Forbidden - Falta de role 'admin')
      else if (err.response.status === 403) {
        errorMessage = 'Acesso negado. Você não tem permissão para esta operação.';
      } 
      // 4. Erros genéricos de requisição
      else {
        errorMessage = `Erro ${err.response.status}: Falha na requisição.`;
      }
    }
    
    console.error("Erro na operação CRUD:", err);
    // ⚠️ Use uma interface mais amigável para exibir o erro (e.g., Toast, Modal)
    alert(errorMessage); 
  };

  // const save = async (record: any) => {
  //   try {
  //     if (route === "playlist") {
  //       if (mode === "edit") {
  //         // 🟡 EDITAR PLAYLIST
  //         await api.put(`/playlist/${editing.id}`, {
  //           ...record,
  //           musicIds: selectedMusics,
  //         });
  //       } else {
  //         // 🟢 CRIAR PLAYLIST
  //         await api.post("/playlist", {
  //           ...record,
  //           musicIds: selectedMusics,
  //         });
  //       }
  //     } 
  //     else if (mode === "edit") {
  //       if (route === "matricula") {
  //         await api.put(`/matricula/${editing.id_aluno}/${editing.id_curso}`, record);
  //       } else {
  //         await api.put(`/${route}/${record.id}`, record);
  //       }
  //     } else {
  //       await api.post(`/${route}`, record);
  //     }

  //     setShowForm(false);
  //     setEditing(null);
  //     setSelectedMusics([]);
  //     getAll();
  //   } catch (err) {
  //     handleApiError(err);
  //   }
  // };
  const save = async (record: any) => {
    try {
      if (route === "playlist") {

        if (mode === "edit") {
          if (!editing?.id) {
            alert("Erro interno: ID da playlist não encontrado.");
            return;
          }

          console.log("Editing playlist:", editing);
          await api.put(`/playlist/${editing.id}`, {
            ...record,
            musicIds: selectedMusics,
          });
        } else {
          await api.post("/playlist", {
            ...record,
            musicIds: selectedMusics,
          });
        }

      } else if (mode === "edit") {

        if (route === "matricula") {
          await api.put(
            `/matricula/${editing.id_aluno}/${editing.id_curso}`,
            record
          );
        } else {
          await api.put(`/${route}/${record.id}`, record);
        }

      } else {
        await api.post(`/${route}`, record);
      }

      setShowForm(false);
      setEditing(null);
      getAll();

    } catch (err) {
      handleApiError(err);
    }
  };

  const remove = async (item: any) => {
    try {
      if (route === "matricula") {
        await api.delete(`/matricula/${item.id_aluno}/${item.id_curso}`);
      } else if (route === "professor-ccr") {
        await api.delete(`/professor-ccr/${item.id_professor}/${item.id_ccr}`);
      }
      else {
        // DELETE /music/4
        await api.delete(`/${route}/${item.id}`);
      }

      getAll();
    } catch (err) {
      // Chama o handler de erro centralizado (trata o erro 400 da Foreign Key)
      handleApiError(err);
    }
  };


  return (
    <div className="mt-4">

      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => {
            if (route === "playlist") {
              setSelectedMusics([]);
            }
            setEditing(null);
            setMode("create");
            setShowForm(true);
          }}
        >
          Novo Registro
        </button>
      )}

      {showForm ? (
        route === "playlist" ? (
          <div className="row">
            <div className="col-md-6">
              <CrudForm
                route={route}
                initialData={editing ?? {}}
                onSubmit={save}
                onCancel={() => setShowForm(false)}
              />
            </div>

            <div className="col-md-6">
              <MusicSelector
                selected={selectedMusics}
                onChange={setSelectedMusics}
              />
            </div>
          </div>
        ) : (
          <CrudForm
            route={route}
            initialData={editing ?? {}}
            onSubmit={save}
            onCancel={() => setShowForm(false)}
          />
        )
      ) : (
        <DataCards
          data={data}
          onEdit={(item: any) => {
            setEditing(item);
            setMode("edit");
            setShowForm(true);
          }}
          onDelete={remove}
        />
      )}

    </div>
  );
}
