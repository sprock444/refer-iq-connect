import { ArrowLeft, Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/email-template" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email Template
          </Link>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>

        {/* Resume Content */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="border-b border-border pb-6 mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Alex Chen</h1>
              <p className="text-lg text-muted-foreground mb-4">Senior Software Engineer</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  alex.chen@email.com
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  (555) 123-4567
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/alexchen
                </div>
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  github.com/alexchen
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Professional Summary</h2>
              <p className="text-muted-foreground leading-relaxed">
                Experienced Senior Software Engineer with 7+ years of expertise in full-stack development, 
                specializing in React, Node.js, and cloud architecture. Proven track record of leading 
                cross-functional teams, delivering scalable solutions, and mentoring junior developers. 
                Passionate about creating user-centric applications and driving technical innovation.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Experience</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">Senior Software Engineer</h3>
                      <p className="text-muted-foreground">TechCorp Inc.</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2021 - Present</span>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Led development of microservices architecture serving 2M+ users</li>
                    <li>Reduced application load time by 40% through performance optimization</li>
                    <li>Mentored 5 junior developers and established code review best practices</li>
                    <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">Software Engineer</h3>
                      <p className="text-muted-foreground">StartupXYZ</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2019 - 2021</span>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Built full-stack web applications using React, Node.js, and PostgreSQL</li>
                    <li>Collaborated with product team to deliver features for 500K+ users</li>
                    <li>Implemented automated testing increasing code coverage to 85%</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">Junior Software Developer</h3>
                      <p className="text-muted-foreground">WebSolutions Ltd.</p>
                    </div>
                    <span className="text-sm text-muted-foreground">2017 - 2019</span>
                  </div>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Developed responsive web applications using HTML, CSS, and JavaScript</li>
                    <li>Maintained and enhanced existing codebases for client projects</li>
                    <li>Participated in agile development processes and sprint planning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Frontend</h4>
                  <p className="text-muted-foreground text-sm">React, TypeScript, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Backend</h4>
                  <p className="text-muted-foreground text-sm">Node.js, Python, Express.js, PostgreSQL, MongoDB, Redis</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Cloud & DevOps</h4>
                  <p className="text-muted-foreground text-sm">AWS, Docker, Kubernetes, CI/CD, GitHub Actions</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Tools</h4>
                  <p className="text-muted-foreground text-sm">Git, Jest, Webpack, Figma, Jira, Slack</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-3">Education</h2>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">Bachelor of Science in Computer Science</h3>
                  <p className="text-muted-foreground">University of California, Berkeley</p>
                </div>
                <span className="text-sm text-muted-foreground">2013 - 2017</span>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Notable Projects</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">E-commerce Platform</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Full-stack e-commerce solution built with React and Node.js, handling 10K+ transactions monthly
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Task Management App</h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    React-based productivity app with real-time collaboration features using WebSocket
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resume;