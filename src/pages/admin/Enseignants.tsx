
import UserManagement from "@/components/admin/UserManagement";

const AdminEnseignants = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestion des utilisateurs</h1>
        <p className="text-muted-foreground">
          Créez et gérez les comptes utilisateurs de la plateforme
        </p>
      </div>
      <UserManagement />
    </div>
  );
};

export default AdminEnseignants;
