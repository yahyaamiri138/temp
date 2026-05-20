import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

import {
  fetchParties,
  deleteParty,
  createParty,
  updateParty,
} from "./partySlice";

import type { RootState, AppDispatch } from "../../app/stores";

import PartyForm from "./PartyForm";

const PartyList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { list } = useSelector((state: RootState) => state.party);

  const toast = useRef<Toast>(null);

  const [formVisible, setFormVisible] = useState(false);

  const [selected, setSelected] = useState<any>(null);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  // ================= ADD =================
  const handleAdd = () => {
    setSelected({
      name: "",
      phone: "",
      type: "",
    });

    setIsEditMode(false);

    setFormVisible(true);
  };

  // ================= EDIT =================
  const handleEdit = (row: any) => {
    setSelected(row);

    setIsEditMode(true);

    setFormVisible(true);
  };

  // ================= DELETE =================
  const handleDelete = (id: number) => {
    confirmDialog({
      message: "Are you sure you want to delete this party?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",

      accept: async () => {
        try {
          await dispatch(deleteParty(id));

          toast.current?.show({
            severity: "success",
            summary: "Deleted",
            detail: "Party deleted successfully",
            life: 3000,
          });

          dispatch(fetchParties());
        } catch {
          toast.current?.show({
            severity: "error",
            summary: "Error",
            detail: "Failed to delete party",
            life: 3000,
          });
        }
      },
    });
  };

  // ================= SAVE =================
  const handleSubmit = async (data: any, editMode: boolean) => {
    try {
      if (editMode) {
        await dispatch(updateParty(data));

        toast.current?.show({
          severity: "success",
          summary: "Updated",
          detail: "Party updated successfully",
          life: 3000,
        });
      } else {
        await dispatch(createParty(data));

        toast.current?.show({
          severity: "success",
          summary: "Created",
          detail: "Party created successfully",
          life: 3000,
        });
      }

      setFormVisible(false);

      dispatch(fetchParties());
    } catch {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 3000,
      });
    }
  };

  return (
    <div className="card">
      {/* ✅ TOAST */}
      <Toast ref={toast} />

      {/* ✅ CONFIRM DIALOG */}
      <ConfirmDialog />

      <div className="card-body">
        <div className="d-flex justify-content-between mb-3">
          <h5>Parties</h5>

          <Button
            label="Add Party"
            className="rounded p-2"
            icon="pi pi-plus"
            size="small"
            onClick={handleAdd}
          />
        </div>

        <DataTable value={list} paginator rows={5}>
          <Column field="name" header="Name" />

          <Column field="phone" header="Phone" />

          <Column field="type" header="Type" />

          <Column
            header="Actions"
            body={(row) => (
              <>
                {/* EDIT */}
                <i
                  className="pi pi-pencil text-primary me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEdit(row)}
                />

                {/* DELETE */}
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row.id)}
                />
              </>
            )}
          />
        </DataTable>

        {/* FORM */}
        <PartyForm
          visible={formVisible}
          onHide={() => setFormVisible(false)}
          onSubmit={handleSubmit}
          initialData={selected}
          isEditMode={isEditMode}
        />
      </div>
    </div>
  );
};

export default PartyList;
