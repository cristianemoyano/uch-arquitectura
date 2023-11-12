import withAuth from "@/components/shared/authHOC";
import UsersForm from "@/components/users/UsersForm";

function Users() {

  return (
    <div className="bg-white text-black ">
      <UsersForm/>
    </div>
  )
}

export default withAuth(Users, true);
