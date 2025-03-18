
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileSkillsServicesProps {
  services: string[];
  skills: string[];
}

const ProfileSkillsServices = ({ services, skills }: ProfileSkillsServicesProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary">
                {service}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index}>
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileSkillsServices;
