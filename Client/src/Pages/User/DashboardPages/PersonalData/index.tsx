import React, { useState } from "react";
import { Clipboard, Edit, User, Lock, MapPin, Mail, Hash } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../../../../Components/components/ui/dialog";
import { Button } from "../../../../Components/components/ui/button";

const PersonalData: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "Ilhan Afandiyev",
    password: "********",
    address: "Baku, Azerbaijan",
    email: "ilhanma@code.edu.az",
    postalCode: "AZ1000",
  });
  const [editField, setEditField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    alert("Copied to clipboard!");
  };

  const handleEdit = (field: string) => {
    setEditField(field);
    setTempValue(formData[field as keyof typeof formData]);
    setIsModalOpen(true);
  };

  const confirmEdit = () => {
    if (editField) {
      setFormData({ ...formData, [editField]: tempValue });
      setEditField(null);
      setIsModalOpen(false);
    }
  };

  const icons: Record<string, JSX.Element> = {
    name: <User size={20} className="text-gray-500" />,
    password: <Lock size={20} className="text-gray-500" />,
    address: <MapPin size={20} className="text-gray-500" />,
    email: <Mail size={20} className="text-gray-500" />,
    postalCode: <Hash size={20} className="text-gray-500" />,
  };

  return (
    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} className="flex flex-col gap-3">
          <label className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {icons[key]}
            </span>
            <input
              type="text"
              value={value}
              disabled
              className="w-full pl-10 pr-16 bg-transparent focus:outline-none border rounded-md p-2"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button onClick={() => handleCopy(value)} className="text-gray-500 hover:text-black">
                <Clipboard size={20} />
              </button>
              <button onClick={() => handleEdit(key)} className="text-blue-500 hover:text-blue-700">
                <Edit size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Confirmation Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogTitle>Confirm Edit</DialogTitle>
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalData;
