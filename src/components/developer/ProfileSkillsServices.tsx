
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileSkillsServicesProps {
  services: string[];
  skills: string[];
  description?: string;
  longDescription?: string;
}

const ProfileSkillsServices = ({ services, skills, description, longDescription }: ProfileSkillsServicesProps) => {
  return (
    <>
      {(description || longDescription) && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {description && <p>{description}</p>}
            {longDescription && <p className="text-muted-foreground">{longDescription}</p>}
          </CardContent>
        </Card>
      )}
      
      <Card className="mb-6">
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
