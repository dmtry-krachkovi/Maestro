import {getType} from '../utils/extensionMapper';
import {formatString} from '../utils/stringUtils';

// Type definitions for the file name
type ExtendedFileNameType = {fileName: string; extension: string};
type FileNameType = string | ExtendedFileNameType;

// Interface implemented by the File class
interface IFile {
  // properties
  _directory: string; // Parent's directory
  _type: string; // File type
  _path: string; // File's path
  _fullName: string; // Full name of the file (eg: Maestro.txt)
  _extendedName: ExtendedFileNameType; // Extended name of the file (eg: {fileName: 'Maestro', extension: 'txt'})
  _createdAt: Date; // Creation date of the file

  // methods
  rename: (name: FileNameType) => void; // To rename the file
  move: (location: string) => void; // To move the file
}

export class File implements IFile {
  _directory: string;
  _type: string;
  _path: string;
  _fullName: string;
  _extendedName: ExtendedFileNameType;
  _createdAt: Date;
  /**
   * When creating a new File, provide the parent _directory and the name of the file
   * @param _directory parent _directory
   * @param name name of the file
   * @returns the file instance
   */
  constructor(directory: string, name: FileNameType) {
    // Save timestamp
    this._createdAt = new Date();

    // format directory string
    // example
    // C:\Users\Maestro\    =>      C:/Users/Maestro
    this._directory = directory;
    this._directory = formatString(this._directory, '\\', '/');
    if (this._directory[this._directory.length - 1] === '/') {
      this._directory = this._directory.slice(0, -1);
    }

    // Find full name and extended name from given name
    if (typeof name === 'string') {
      // name is of form Maestro.txt
      // find extended name of form {fileName: 'Maestro', extension:'txt'}
      let dotIndex: number | null = null;
      for (let i = name.length - 1; i >= 0; i--) {
        if (name[i] === '.') {
          dotIndex = i;
          break;
        }
      }

      if (dotIndex === null) {
        // File name does not contain any dots
        // Default to txt
        this._extendedName = {
          fileName: name,
          extension: 'txt',
        };
        this._fullName = `${name}.${this._extendedName.extension}`;
      } else {
        this._fullName = name;
        this._extendedName = {
          fileName: name.slice(0, dotIndex),
          extension: name.slice(dotIndex + 1, name.length),
        };
      }
    } else {
      this._extendedName = name;
      // name is of form {fileName: 'Maestro', extension: 'txt'}
      // find full name of form Maestro.txt
      this._fullName = `${name.fileName}.${name.extension}`;
    }
    this._path = this._directory + '/' + this._fullName;

    // Get type from extension
    this._type = getType(this._extendedName.extension);
  }

  /**
   * To rename the file, provide the new name, either extended or full
   * @param name new name
   */
  rename(name: FileNameType): void {
    if (typeof name === 'string') {
      // name is of form Maestro.txt
      // find extended name of form {fileName: 'Maestro', extension:'txt'}
      let dotIndex: number | null = null;
      for (let i = name.length - 1; i >= 0; i--) {
        if (name[i] === '.') {
          dotIndex = i;
          break;
        }
      }

      if (dotIndex === null) {
        // File name does not contain any dots
        // default to txt
        this._extendedName = {
          fileName: name,
          extension: 'txt',
        };
        this._fullName = `${name}.${this._extendedName.extension}`;
      } else {
        this._fullName = name;
        this._extendedName = {
          fileName: name.slice(0, dotIndex),
          extension: name.slice(dotIndex + 1, name.length),
        };
      }
    } else {
      this._extendedName = name;
      // name is of form {fileName: 'Maestro', extension: 'txt'}
      // find full name of form Maestro.txt
      this._fullName = `${name.fileName}.${name.extension}`;
    }
    this._type = getType(this._extendedName.extension);
    this._path = `${this._directory}/${this._fullName}`;
  }

  /**
   * To move the file, provide the new directory
   * @param location New directory
   */
  move(location: string): void {
    // format the location string
    this._directory = location;
    this._directory = formatString(this._directory, '\\', '/');
    if (this._directory[this._directory.length - 1] === '/') {
      this._directory = this._directory.slice(0, -1);
    }

    this._path = `${this._directory}/${this._fullName}`;
  }
}
