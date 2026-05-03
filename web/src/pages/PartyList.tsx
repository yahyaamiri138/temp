import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import {
  fetchParties,
  deleteParty,
  createParty,
  updateParty,
} from "../features/party/partySlice";

import type { RootState, AppDispatch } from "../app/stores";
import PartyForm from "./PartyForm";

const PartyList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.party);

  const [formVisible, setFormVisible] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchParties());
  }, [dispatch]);

  // ADD
  const handleAdd = () => {
    setSelected({});
    setIsEditMode(false);
    setFormVisible(true);
  };

  // DELETE
  const handleDelete = (id: number) => {
    dispatch(deleteParty(id));
  };

  // SAVE
  const handleSubmit = async (data: any, editMode: boolean) => {
    if (editMode) {
      await dispatch(updateParty(data));
    } else {
      await dispatch(createParty(data));
    }

    setFormVisible(false);
    dispatch(fetchParties());
  };

  return (
    <div className="card">
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

          <Column
            header="Actions"
            body={(row) => (
              <>
                <i
                  className="pi pi-trash text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(row.id)}
                />
              </>
            )}
          />
        </DataTable>

        {/* ✅ فرم اینجاست */}
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
